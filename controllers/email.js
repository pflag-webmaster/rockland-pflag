

module.exports.sendEmail = (type, info) => {
    let targetInfo = emailInfo[type];

    if (type === undefined || type === '' || emailInfo[type] === undefined ) {
        console.log('type is missing for email');
        return 'Fatal Email error';
    }
    else {
        const emailTemplate = getTemplate(type);

        console.log(emailTemplate);



    }
}

async function getTemplate(type) {
    emailTemplate = await import(`../templates/${type}`);
    return emailTemplate;
}


