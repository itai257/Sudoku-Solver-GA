var singleSwapChance = 0.5; // 0 -> 0.5 -- (0.5)
var threeSwapChance = 0.3;  //  0.5 -> 0.8
var inserationChance = 0.2; // 0.8 -> 1 -- (0.2)

class MutationService{
    static Mutate(seed, staticBoard){
        let rand = Math.random();
        if(rand < singleSwapChance){
            MutationService.SingleSwap(seed, staticBoard);
        }else if(rand > (1 - inserationChance)){
            MutationService.ThreeSwap(seed, staticBoard);
        }else{
            MutationService.Insertion(seed, staticBoard);
        }
    }

    static SingleSwap(seed, staticBoard){
        for(let i=0;i<6;i++){
            let staticBlock = staticBoard.slice(i*6,(i*6)+6);
            let blockToChange = seed.Blocks[i];

            let nonStaticIdx = GetChangableIndexesFromBlock(staticBlock);
            let swapedIdx = SingleSwapIndexes(nonStaticIdx);

            let oldBlock = blockToChange.slice();
            for(let j = 0; j< nonStaticIdx.length; j++){
                let oldIdx = nonStaticIdx[j];
                let newIdx = swapedIdx[j];
                blockToChange[newIdx] = oldBlock[oldIdx];
            }
        }
    }

    static ThreeSwap(seed, staticBoard){
        for(let i=0;i<6;i++){
            let staticBlock = staticBoard.slice(i*6,(i*6)+6);
            let blockToChange = seed.Blocks[i];

            let nonStaticIdx = GetChangableIndexesFromBlock(staticBlock);
            let swapedIdx = ThreeSwapIndexes(nonStaticIdx);

            let oldBlock = blockToChange.slice();
            for(let j = 0; j< nonStaticIdx.length; j++){
                let oldIdx = nonStaticIdx[j];
                let newIdx = swapedIdx[j];
                blockToChange[newIdx] = oldBlock[oldIdx];
            }
        }
    }

    static Insertion(seed, staticBoard){
        for(let i=0;i<6;i++){
            let staticBlock = staticBoard.slice(i*6,(i*6)+6);
            let blockToChange = seed.Blocks[i];

            let nonStaticIdx = GetChangableIndexesFromBlock(staticBlock);
            let swapedIdx = InsertionIndexes(nonStaticIdx);

            let oldBlock = blockToChange.slice();

            for(let j = 0; j< nonStaticIdx.length; j++){
                let oldIdx = nonStaticIdx[j];
                let newIdx = swapedIdx[j];
                blockToChange[oldIdx] = oldBlock[newIdx];
            }
        }
    }
}
function InsertionIndexes(indexes){
    let numOfIdx = indexes.length;
    if(numOfIdx <= 1){
        return indexes;
    }

    var newArr = indexes.slice();

    let movedIdx = Math.floor(Math.random() * numOfIdx);
    let targetIdx = movedIdx;
    while(targetIdx == movedIdx){
        targetIdx = Math.floor(Math.random() * numOfIdx);
    }

    let movedVal = indexes[movedIdx];

    let i = movedIdx;
    while(i != targetIdx){
        let PrevToi = backOne(i, numOfIdx);
        newArr[i] = indexes[PrevToi];
        i = PrevToi;
    }
    newArr[targetIdx] = movedVal;

    return newArr;
}

function backOne(i, numOfIdx){
    let k = i-1;
    if(k<0){
        k = numOfIdx - 1;
    }

    return k;
}

function ThreeSwapIndexes(indexes){
    let numOfIdx = indexes.length;
    if(numOfIdx <= 2){
        return indexes;
    }

    var newArr = indexes.slice();

    let firstIdx = Math.floor(Math.random() * numOfIdx);
    let secondIdx = firstIdx;
    let thirdIdx = firstIdx;
    while(secondIdx == firstIdx){
        secondIdx = Math.floor(Math.random() * numOfIdx);
    }
    while(thirdIdx == firstIdx || thirdIdx == secondIdx){
        thirdIdx = Math.floor(Math.random() * numOfIdx);
    }

    let idxArr = [firstIdx, secondIdx, thirdIdx];
    idxArr.sort((x, y) => x - y);

    let temp0 = newArr[idxArr[0]];
    let temp1 = newArr[idxArr[1]];
    let temp2 = newArr[idxArr[2]];

    newArr[idxArr[1]] = temp0;
    newArr[idxArr[2]] = temp1;
    newArr[idxArr[0]] = temp2;

    return newArr;
}

function SingleSwapIndexes(indexes){
    let numOfIdx = indexes.length;
    if(numOfIdx <= 1){
        return indexes;
    }

    var newArr = indexes.slice();
    let firstIdx = Math.floor(Math.random() * numOfIdx);
    let secondIdx = firstIdx;
    while(secondIdx == firstIdx){
        secondIdx = Math.floor(Math.random() * numOfIdx);
    }

    let temp = newArr[firstIdx];
    newArr[firstIdx] = newArr[secondIdx];
    newArr[secondIdx] = temp;

    return newArr;
}

function GetChangableIndexesFromBlock(staticBlock){
    let indexes = [];
    for(let i=0;i<6;i++){
        if(staticBlock[i] == 0){
            indexes.push(i);
        }
    }

    return indexes;
}
