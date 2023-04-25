//** object for experiments  */
const scores = {
    Anna: 10,
    Olga: 1,
    Ivan: 555,
    foo: 'rtg',
    boolean: 'true',
    //bar: asdfasdf  // bed data's example, but i can't use it, because it ruins with message 'asdfasdf is not defined'
    };


/**
 * Function calculates scores from object 'scores'
 * 
 * @param {const key in scores}   making an iterations
 * @param {case 'number':} if it's true, calculates scores
 * @param {case '!number':} if it's true, shows the message about wrong parametr
 * @param {default:} other nondiscribed ways have to show message about wrong data
 * @returns counted scores from object
 */

let getScored = (obj) => {
    let sum = 0;
    for (const key in scores) {
        switch (typeof scores[key]) {
            case 'number':
            sum += scores[key];
            break;
            
            case '!number':
            console.log('Invalid key parametr')
            break;

            default:
            console.log( "wrong data");
        }     
    };
    return sum
}
console.log(getScored(scores));

