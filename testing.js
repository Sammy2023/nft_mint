const takenFaces = {};
function randInt(max) {
    return Math.floor(Math.random() * (max + 1));
}
function createFace(){
    const bg = randInt(5);
    const hair = randInt(7);
    const eyes = randInt(9);
    const nose = randInt(4); 
    const mouth = randInt(5);
    const beard = randInt(3);
    // 18,900 combinations

    //Concantenates all the random 
    // component into a string
    // '0932423'
    const face = [hair, eyes, mouth, nose, beard].join('');
    face[takenFaces] = face;
    console.log(takenFaces);

}

createFace();