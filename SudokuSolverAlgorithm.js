//Main funcions
var bestSolution;
var numOfIterations;

function SolveAlgorithm(){
    numOfIterations = 0;
    var staticBoard = GetBlocksBoardRepresentation(currentSudokuBoard); // change to 2X3 blocks & cast to int array
    var population = InitializePopulation(currentPopulationSize, staticBoard);
    population.Sort();
    bestSolution = GetBestSolution(population);
    var StopCondition;
    if($('#shouldRunAllIteration').is(":checked")){
        StopCondition = StopCondition_RunAllIterations;
    }else{
        StopCondition = StopCondition_StopWhenFindingSolution;
    }
    DrawRunValues();
    while(StopCondition()){
        numOfIterations++;
        var elites = GetElites(population); // preserve elites to next generation
        var newPopulationSeeds = [];
        for(let i = 0; i < (currentPopulationSize-currentElitesSize)/2;){
            var parentsCandidates = GetTwoParentCandidates(population.Seeds);
            var parent1 = parentsCandidates[0];
            var parent2 = parentsCandidates[1];
            if(!ShouldCrossover()){
                continue;
            }
            var children = Crossover(parent1, parent2);
            i++;
            
            if(ShouldMutate()){
                MutationService.Mutate(children[0], staticBoard);
                MutationService.Mutate(children[1], staticBoard);
            }
            newPopulationSeeds = newPopulationSeeds.concat(children);
            }

            population.Seeds = newPopulationSeeds.concat(elites);
            population.Sort();
            bestSolution = GetBestSolution(population);
    }

    DrawRunValues();
    return GetRegularBoardRepresentation(bestSolution);
}

function DrawRunValues(){
    $('#currNumberOfGenerations').html(numOfIterations); 
    $('#currBestFitness').html(bestSolution.Fitness);
    $('#totalGenerations').html(currentMaxGenerations);
    if(bestSolution.Fitness != 0){
        $('#currBestFitness').css('color','#FF0000')
    }else{
        $('#currBestFitness').css('color','#000000')
    }
}

function ShouldCrossover(){
    let num = Math.random();
    if(num < currentCrossOverSize){
        return true;
    }

    return false;
}

function ShouldMutate(){
    let num = Math.random();
    if(num < currentMutationSize){
        return true;
    }

    return false;
}

function StopCondition_StopWhenFindingSolution(){
    if(bestSolution.Fitness == 0 || numOfIterations >= currentMaxGenerations){
        return false;
    }

    return true;
}

function StopCondition_RunAllIterations(){
    if(numOfIterations >= currentMaxGenerations){
        return false;
    }

    return true;
}

function GetRegularBoardRepresentation(bestSolution){
    var solution = [];
    for(let i=0; i< 6; i++){
        for(let j=0; j< 6; j++){
            solution.push(bestSolution.Rows[i][j]);
        }
    }

    return solution;
}

function GetBlocksBoardRepresentation(currentSudokuBoard){
    var newBoard = [];
    var rows = [];
    for(let i = 0,j = 6; i < 36; i+=6,j+=6){
        rows.push(currentSudokuBoard.slice(i,j));
    }

    newBoard = newBoard.concat(rows[0].slice(0,3).split(''));
    newBoard = newBoard.concat(rows[1].slice(0,3).split(''));

    newBoard = newBoard.concat(rows[0].slice(3,6).split(''));
    newBoard = newBoard.concat(rows[1].slice(3,6).split(''));
    
    newBoard = newBoard.concat(rows[2].slice(0,3).split(''));
    newBoard = newBoard.concat(rows[3].slice(0,3).split(''));

    newBoard = newBoard.concat(rows[2].slice(3,6).split(''));
    newBoard = newBoard.concat(rows[3].slice(3,6).split(''));

    newBoard = newBoard.concat(rows[4].slice(0,3).split(''));
    newBoard = newBoard.concat(rows[5].slice(0,3).split(''));

    newBoard = newBoard.concat(rows[4].slice(3,6).split(''));
    newBoard = newBoard.concat(rows[5].slice(3,6).split(''));

    return newBoard;
}

function GetBestSolution(population){
    return population.Seeds[0];
}
function GetElites(population){
    if(currentElitesSize == 0){
        return [];
    }
    
    return population.Seeds.slice(0, currentElitesSize);
}
function InitializePopulation(populationSize, board){
    var population = new Population();
    for(let i=0;i<populationSize;i++){
        var seedNumbers = [];
        for(let j=0; j<6; j++){
            let block = board.slice(j*6, (j*6) + 6);
            let blockMissingNumbers = GetBlockMissingNumbers(block);
            ShuffleArray(blockMissingNumbers);
            let seedBlockNumbers = getSeedBlockNumbers(block, blockMissingNumbers);
            seedNumbers = seedNumbers.concat(seedBlockNumbers);
        }

        population.Seeds.push(new Seed(seedNumbers));
    }

    return population;
}

function getSeedBlockNumbers(block, blockMissingNumbers){
    var finalBlock = []
    for(let i=0; i<6; i++){
        if(block[i] == 0){
            finalBlock.push(""+blockMissingNumbers.pop());
        }else{
            finalBlock.push(block[i]);
        }
    }

    return finalBlock;
}

function  GetBlockMissingNumbers(block){
    let allNumbers = [1,2,3,4,5,6];
    for(let i=0; i<block.length;i++){
        let idx = allNumbers.findIndex(e => e == block[i]);
        if(idx > -1){
            allNumbers.splice(idx, 1);
        }
    }

    return allNumbers;
}

function GetTwoParentCandidates(parentsPool){
    var firstChildIndex = Math.floor(Math.random() * (parentsPool.length));
    var secondChildIndex = Math.floor(Math.random() * (parentsPool.length));

    var candidates = [];
    candidates.push(parentsPool[firstChildIndex]);
    candidates.push(parentsPool[secondChildIndex]);

    return candidates;
}

function Crossover(parent1, parent2){
    let child1CrossoverPoints = [];
    let child2CrossoverPoints = [];
    let child1Solution = [];
    let child2Solution = [];

    for(let j=0;j<6;j++){
        child1CrossoverPoints.push(randOneOrZero());
        child2CrossoverPoints.push(randOneOrZero());
    }

    for(let i=0; i<6; i++){
        child1Solution = child1Solution.concat(GetCrossoverPointNumbersFromParents(parent1.Blocks[i], parent2.Blocks[i], child1CrossoverPoints[i]));
        child2Solution = child2Solution.concat(GetCrossoverPointNumbersFromParents(parent1.Blocks[i], parent2.Blocks[i], child2CrossoverPoints[i]));
    }
    
    var children = [new Seed(child1Solution),new Seed(child2Solution)];
    return children;
}

function ShuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function randOneOrZero(){
    let num = Math.random();
    if(num < 0.5){
        return 0;
    }

    return 1;
}

function GetCrossoverPointNumbersFromParents(parent1Block, parent2Block, idx){
    if(idx == 0){
        return parent1Block;
    }

    if(idx == 1){
        return parent2Block;
    }

    throw new Error("in function GetCrossoverPointNumbersFromParents(parent1Block, parent2Block, idx)");
}

// Created By Itay Malka