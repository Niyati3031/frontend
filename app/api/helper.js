export const getAllCars = async() => {
    try {
        const res = await fetch('http://localhost:5050/cars/',{
            method: 'GET',
        });

        const data = res.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const getAllCarsTag = async(tags) => {
    try {
        let res = await fetch(`http://localhost:5050/cars/searchTag/${tags}`,{
            method: 'GET',
        });
        const data = res.json();
        console.log(data);
        return (await data);
    } catch (error) {
        console.log(error)
    }
}

export const getAllCarsTitle = async(title) => {
    try {
        let res = await fetch(`http://localhost:5050/cars/searchT/${title}`,{
            method: 'GET',
        });
        const data = res.json();
        console.log(await data);
        return (await data);
    } catch (error) {
        console.log(error)
    }
}

export const getAllCarsDesc = async(desc) => {
    try {
        let res = await fetch(`http://localhost:5050/cars/searchD/${desc}`,{
            method: 'GET',
        });
        const data = res.json();
        console.log(data);
        return (await data);
    } catch (error) {
        console.log(error)
    }
}