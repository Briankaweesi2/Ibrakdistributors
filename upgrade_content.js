const fs = require('fs');
const path = require('path');

const dir = './';

const replacements = [
    {
        old: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
        new: 'At Ibrak Distributors, we ensure transparent, efficient, and reliable logistics tailored specifically to the East African market. Our team is dedicated to handling everything from customs clearance to final-mile delivery.'
    },
    {
        old: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dum since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap',
        new: 'Navigating customs and international freight can be complex. We provide comprehensive brokerage solutions to streamline your imports and exports, ensuring compliance with local Ugandan and international trade regulations without the hassle.'
    },
    {
        old: 'Lorem ipsum dolor sit ametcon sectetur adipiscing elit sed do deserunt mollitia when an unknown the industry’s standard dum since the 1500s.',
        new: 'Our deep expertise in the East African transport corridor guarantees secure, timely, and cost-effective distribution for your business.'
    },
    {
        old: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea comodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        new: 'Our premium logistics packages are designed to cover end-to-end supply chain requirements. Whether you are moving cargo from China, Dubai, or Europe into Uganda, we offer robust warehousing, rapid transit, and dedicated account management to ensure your goods arrive safely.'
    },
    { old: 'Which types logo services you provide ?', new: 'What types of logistics services do you provide?' },
    { old: 'Can we get logo vector file of design ?', new: 'Do you handle customs clearance for international shipments?' },
    { old: 'What does having Managed your services provider?', new: 'What is your delivery coverage in East Africa?' },
    { old: 'What are laboratory tests?', new: 'How can I track my shipment?' },
    { old: 'What you about say your Business planning?', new: 'Do you offer secure warehousing facilities?' },
    { old: 'You have a unique way of the working in IT?', new: 'How long does freight take from Dubai or China to Kampala?' },
    { old: 'What types of systems do you support?', new: 'What industries do you distribute for?' },
    { old: 'Can you provide of all IT Management services?', new: 'Can you handle procurement as well as transport?' }
];

function upgradeContent(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    for (let rule of replacements) {
        content = content.split(rule.old).join(rule.new);
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Upgraded content in ${filePath}`);
    }
}

function walk(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!fullPath.includes('node_modules') && !fullPath.includes('.git')) {
                walk(fullPath);
            }
        } else if (fullPath.endsWith('.html')) {
            upgradeContent(fullPath);
        }
    });
}

walk(dir);
console.log('Content upgrade complete.');
