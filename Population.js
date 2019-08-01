class Population{
    constructor(){
        this.Seeds = [];
    }

    Sort(){
        this.Seeds.sort((x, y) => x.Fitness - y.Fitness); 
    }
}