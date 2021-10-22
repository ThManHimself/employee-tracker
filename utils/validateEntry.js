// Varifies if data entered is valid data.
// If it is not, send an error and let the user know
module.exports = function(obj, ...props) {
    const errors = [];

    props.forEach((prop)=>{
        // if a property is blank or extra properties were added that dont belong, add to errors array
        if (obj[prop] === undefined || obj[prop] === '') {
            errors.push(`No ${prop} specified.`);
        }
    });

    if (errors.length) {
        return {
            error: errors.join(' ')
        };
    }

    return null;
};