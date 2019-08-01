
// import modules
var modules = [];
modules.push('MutationService.js');
modules.push('Seed.js');
modules.push('Population.js');
modules.push('SudokuSolverAlgorithm.js');
modules.push('gameData.js');
modules.push('main.js');


modules.forEach(e => {
    importModule(e)
});


// functions section:

// 
function importModule(src){
    let script = document.createElement("script"); 
    script.src = src; 
    document.head.appendChild(script);
}

