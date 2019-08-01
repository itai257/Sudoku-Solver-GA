class Seed{
    constructor(seed){
        this.Solution = seed;
        this.Blocks = this.GetBlocks();
        this.Rows = this.GetRows();
        this.Columns = this.GetColumns();
        this.Fitness = this.Evaluate();
    }

    GetBlocks(){
        var blocks = [];
        blocks.push(this.Solution.slice(0,6));
        blocks.push(this.Solution.slice(6,12));
        blocks.push(this.Solution.slice(12,18));
        blocks.push(this.Solution.slice(18,24));
        blocks.push(this.Solution.slice(24,30));
        blocks.push(this.Solution.slice(30,36));
        return blocks;
    }

    GetRows(){
        var rows = [];
        for(let i=0;i<6;i++){
            var row = [];
            if(i%2 == 0){
                row = row.concat(this.Blocks[i].slice(0,3));
                row = row.concat(this.Blocks[i+1].slice(0,3));
            }else{
                row = row.concat(this.Blocks[i-1].slice(3,6));
                row = row.concat(this.Blocks[i].slice(3,6));
            }
            rows.push(row);
        } 
        
        return rows;
    }

    GetColumns(){
        var cols = [];
        for(let i=0;i<6;i++){
            var col = [];
            for(let j = 0;j<6;j++){
                col.push(this.Rows[j][i]);
            }

            cols.push(col);
        }

        return cols;
    }

    Evaluate(){
        var fitness = 0;
        let gi1 = new Array(6).fill(0);
        let gj1 = new Array(6).fill(0);
        let gi2 = new Array(6).fill(0);
        let gj2 = new Array(6).fill(0);
        let gi3 = new Array(6).fill(0);
        let gj3 = new Array(6).fill(0);
    
        for(let i=0;i<6;i++) {
            let rowsSum = 0, colsSum = 0;
            let rowsProduct = 1, colsProduct = 1;
            let rowsCountArr = new Array(6).fill(0);
            let colsCountArr = new Array(6).fill(0);

            for(let j=0;j<6;j++){
                let rValue = parseInt(this.Rows[i][j]); 
                let cValue = parseInt(this.Columns[i][j]);
                rowsSum += rValue;
                colsSum += cValue;
                rowsProduct *= rValue;
                colsProduct *= cValue;
                rowsCountArr[rValue-1]+=1;
                colsCountArr[cValue-1]+=1;
            }

            let missingInRows = 0, missingInCols = 0;
            rowsCountArr.forEach(function (v){ if(v == 0) missingInRows +=1; });
            colsCountArr.forEach(function (v){ if(v == 0) missingInCols +=1; });

            gi1[i] = Math.abs(21-rowsSum);
            gj1[i] = Math.abs(21-colsSum);
            gi2[i] = Math.abs(720-rowsProduct);
            gj2[i] = Math.abs(720-colsProduct);
            gi3[i] = missingInRows;
            gj3[i] = missingInCols;
        }

        fitness = 10*(gi1.reduce((x, y) => x+y,0) + gj1.reduce((x,y) => x+y,0));
        fitness += this.SumOfSqrt(gi2);
        fitness += this.SumOfSqrt(gj2);
        fitness += 50*(gi3.reduce((x, y) => x+y,0) + gj3.reduce((x,y) => x+y,0));

        return fitness;
    }

    SumOfSqrt(arr){
        var sum = 0;
        for(let i=0;i<arr.length;i++){
            sum += Math.sqrt(arr[i]);
        }

        return sum;
    }

   
}