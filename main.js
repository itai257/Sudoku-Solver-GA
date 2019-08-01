var defaultPopulationSize = 75;
var defaultCrossOverSize = 0.4;
var defaultMutationSize = 0.12;
var defaultMaxGenerations = 200;
var defaultElitesSize = 30;

var currentSudokuBoard = "";
var currentPopulationSize;
var currentCrossOverSize;
var currentMutationSize;
var currentMaxGenerations;
var currentElitesSize;
Default();

/**************************** main **************************************/
function NewGame(){
    var level = $('#gameLevel').val();
    var sudokuValues = getSudokuValues(level);
    drawSudokuValuesOnBoard(sudokuValues);
    ResetBoardStyle();
}

function drawSudokuValuesOnBoard(values){
    currentSudokuBoard = values;
    var divCellSelector = "cell";
    for(let i=1;i<=36;i++){
        let selector = divCellSelector+i;
        let val = values[i-1] == 0? '' : values[i-1]
        $('#'+selector).html(val);
    }
}

function Solve(){
    ResetBoardStyle();
    $('#scoreBoard').css('visibility','visible');
    UpdateCurrentValues();
    let solution = SolveAlgorithm();
    BoldStaticBoard();
    drawSudokuValuesOnBoard(solution);
}

function ResetBoardStyle(){
    var divCellSelector = "cell";
    for(let i=1;i<=36;i++){
        let selector = divCellSelector+i;
        $('#'+selector).css('font-weight', 'normal');
    }
}

function BoldStaticBoard(){
    var divCellSelector = "cell";
    for(let i=1;i<=36;i++){
        if(currentSudokuBoard[i-1] != 0){
            let selector = divCellSelector+i;
            $('#'+selector).css('font-weight', 'bold');
        }
    }
}

function UpdateCurrentValues(){
    currentCrossOverSize = $('#crossoverChance').val(); 
    currentPopulationSize = $('#populationSize').val();
    currentMutationSize = $('#mutationChance').val();
    currentMaxGenerations = $('#maxGenerations').val();
    currentElitesSize = $('#elitesSize').val();
}

function ResetGame(){
    var values = new Array(36).fill(0);
    drawSudokuValuesOnBoard(values);
    ResetBoardStyle();
}

function Default(){
    currentCrossOverSize = defaultCrossOverSize;
    currentMutationSize = defaultMutationSize;
    currentPopulationSize = defaultPopulationSize;
    currentMaxGenerations = defaultMaxGenerations;
    currentElitesSize = defaultElitesSize;

    $('#scoreBoard').css('visibility','hidden');
    $('#crossoverChance').val(defaultCrossOverSize); 
    $('#populationSize').val(defaultPopulationSize);
    $('#mutationChance').val(defaultMutationSize);
    $('#maxGenerations').val(defaultMaxGenerations);
    $('#elitesSize').val(defaultElitesSize);

    $('#crossoverChanceOut').html($('#crossoverChance').val());
    $('#populationSizeOut').html($('#populationSize').val());
    $('#mutationChanceOut').html($('#mutationChance').val());
    $('#maxGenerationsOut').html($('#maxGenerations').val());
    $('#elitesSizeOut').html($('#elitesSize').val());
}