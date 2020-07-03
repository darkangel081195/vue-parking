export const generateCarList = (slots,cars)=>{
    let first = 0;
    let second = 1000 + cars;
    let third = 0;
    let colors = ['Red','White','Black','Blue'];
    let carsList = [];

    for(let i = 0 ; i < slots ; i++){

        if(i < cars){
            const registration = `KA-0${first}-AA-${second}`;
    
            carsList.push({
                slot : i + 1,
                registration : registration,
                color : colors[third]
            });
    
            first = (first + 1)%10;
            second -= 1;
            third = (third + 1)%4;
        }
        else{
            carsList.push(null)
        }
    }
    return carsList;
}