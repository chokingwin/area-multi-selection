import areaData from './area-source.json';

class AreaProducer {
    constructor() {
        this.arr = [];
    }

    get2LevelArea() {
        let parent = areaData['1'];
        let parentArr = [];
        let pObj = {};
        let cObj = {};
        let tmpObj = {};
        let tmpArr = [];

        for (let i in parent) {
            pObj.value = i;
            pObj.label = parent[i];
            pObj.checkAll = true;

            pObj.children = areaData[i];
            tmpObj = areaData[i];

            for (let j in tmpObj) {
                cObj.value = j;
                cObj.label = tmpObj[j];
                cObj.isCheck = true;
                tmpArr.push(cObj);
                cObj = {};
            }

            pObj.children = tmpArr;
            pObj.childrenCount = tmpArr.length;
            pObj.isCheckChildrenCount = tmpArr.length;

            parentArr.push(pObj);
            pObj = {};
            cObj = {};
            tmpObj = {};
            tmpArr = [];
        }
        return parentArr;
    }
}

export default new AreaProducer()
