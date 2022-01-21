var rarityValue, setID, typeValue, mainStatID, mainStatVID, mainStatName, mainStatValue
var subStatID = ["","","",""]
var subStatVID = ["","","",""]
var subStatName = ["","","",""]
var subStatValue = [0,0,0,0]
var levelValue = 0

const rarityClick = (rarityChosen) => {
    rarityValue = rarityChosen.innerHTML;
    const oldRarity = document.getElementsByClassName("btn btn-light rarity-btn");
    var oldr
    for (oldr = 0; oldr < oldRarity.length; oldr++) {
        oldRarity[oldr].setAttribute("class","btn btn-outline-light rarity-btn");
    }
    rarityChosen.setAttribute("class","btn btn-light rarity-btn");

    const setDropdownItems = document.getElementById("setDropdownItems").getElementsByTagName("li");
    var item, itemAnchor, itemRarities, r;
    for (item = 0; item < setDropdownItems.length; item++) {
        itemAnchor = setDropdownItems[item].getElementsByTagName("a")[0];
        itemRarities = itemAnchor.getAttribute("data-setRarities").split(",");
        var rCheck = 0;
        for (r = 0; r < itemRarities.length; r++ ) {
            if (rarityValue == itemRarities[r]) {
                rCheck = 1;
            } else {
            }
        } 
        if (rCheck == 0) {
            setDropdownItems[item].style.display = "none";
            itemAnchor.dataset.rarityhide = "yes";
        } else {
            setDropdownItems[item].style.display = "initial";
            itemAnchor.dataset.rarityhide = "no";    
        }       
    }
    if (mainStatVID) {
        msvUpdate();
    }
    document.getElementById("levelRange").max = rarityChosen.getAttribute("data-level");
    document.getElementById("rarityNumber").innerHTML = rarityValue+"*";
    if (setID) {
        setClear();
    }
}


const setInputKey = () => {
    const setInputValue = document.getElementById("setInput").value.toLowerCase();
    const setDropdownItems = document.getElementById("setDropdownItems").getElementsByTagName("li");
    var item, itemAnchor, itemValue;
    for (item = 0; item < setDropdownItems.length; item++) {
        itemAnchor = setDropdownItems[item].getElementsByTagName("a")[0];
        itemValue = itemAnchor.text;
        if (itemValue.toLowerCase().indexOf(setInputValue) > -1) {
            console.log(itemAnchor)
            if (itemAnchor.dataset.rarityhide == "no") {
                setDropdownItems[item].style.display = "initial"; 
            }
        } else {
            setDropdownItems[item].style.display = "none";
        }      
    }
}

const setItemClick = (setChosen) => {
    document.getElementById("setDropdownButton").innerHTML = setChosen.text;
    document.getElementById("setName").innerHTML = setChosen.text;
    document.getElementById("setDropdownButton").setAttribute("class", "btn w-50 btn-light dropdown-toggle show");
    setID = setChosen.dataset.setid;
    if (typeValue) {
        spnUpdate();
    }
}

const typeClick = (typeChosen) => {
    document.getElementById("typeName").innerHTML = typeChosen.innerHTML;
    typeValue = typeChosen.innerHTML;
    const oldType = document.getElementsByClassName("btn btn-light type-btn");
    var ot
    for (ot = 0; ot < oldType.length; ot++) {
        oldType[ot].setAttribute("class","btn btn-outline-light type-btn");
    }
    typeChosen.setAttribute("class","btn btn-light type-btn");
    if (setID) {
        spnUpdate();
    }
    msBtnUpdate()

}

const levelChange = (levelChosen) => {
    levelValue = levelChosen.value;
    document.getElementById("levelNumber").innerHTML = "Lvl "+levelValue;
    if (mainStatVID && rarityValue) {
        msvUpdate();
    }
}

const mainStatClick = (mainStatChosen) => {
    mainStatID = mainStatChosen.dataset.statid
    mainStatVID = mainStatChosen.dataset.statmvid;
    mainStatName = mainStatChosen.innerHTML;
    const oldStat = document.getElementsByClassName("btn btn-light main-btn");
    var os
    for (os = 0; os < oldStat.length; os++) {
        oldStat[os].setAttribute("class","btn btn-outline-light main-btn");
    }
    mainStatChosen.setAttribute("class","btn btn-light main-btn");
    if (rarityValue) {
        msvUpdate();
    }
}

const sStatItemClick = (subStatChosen) => {
    const ssRef = subStatChosen.dataset.substat
    subStatID[ssRef] = subStatChosen.dataset.statid
    subStatVID[ssRef] = subStatChosen.dataset.statvid
    subStatName[ssRef] = subStatChosen.text
    document.getElementById("subStat"+ssRef+"DropdownButton").innerHTML = subStatChosen.text;
    document.getElementById("subStat"+ssRef).innerHTML = subStatChosen.text;
    document.getElementById("subStat"+ssRef+"DropdownButton").setAttribute("class", "btn w-75 btn-light dropdown-toggle show");
    document.getElementById("subStat"+ssRef+"InputBox").value = ""
}


const msBtnUpdate = async () => {
    try {
        mainStatVID = ""
        mainStatName = ""
        document.getElementById("mStatBtnLbl").setAttribute("class", "label d-none")
        document.getElementById("mainStat").innerHTML = "Main Stat";
        const msDomRef = document.querySelector('#mainStatItems')
        const Resp = await fetch(`/api/main-stat-buttons?type=${typeValue}`);
        const jsonMainStats = await Resp.json();
        let msHTML = [];
        jsonMainStats.forEach(mStat => {
            msHTML.push(msView(mStat));
        });
        msDomRef.innerHTML = msHTML.join("");
    }catch (e) {
        console.log(e)
        console.log("could not fetch type main stats")
    }
}

const msView = (mStat) => `
    <button onclick="mainStatClick(this)" type="button" class="btn btn-outline-light main-btn" data-statID="${mStat._id}" data-statMVID="${mStat.stat_main_values_id}">${mStat.stat_name}</button>
`;


const msvUpdate = async () => {
    try {
        const Resp = await fetch(`/api/main-stat-update?id=${mainStatVID}&rarity=${rarityValue}&lvl=${levelValue}`);
        const jsonStatValue = await Resp.json();
        mainStatValue = jsonStatValue.$numberDecimal
        document.getElementById("mainStat").innerHTML = mainStatName+": "+mainStatValue;
    } catch (e) {
        console.log(e)
        console.log("could not fetch main stat value")
    }
}

const spnUpdate = async () => {
    try {
        const Response = await fetch(`/api/set-piece-name?set=${setID}&type=${typeValue}`)
        const setPieceName = await Response.json();
        document.getElementById("typeName").innerHTML = setPieceName;

    } catch (e) {
        console.log(e)
        console.log("could not fetch set piece name")
    }
}

const setClear = () => {
    document.getElementById("setDropdownButton").innerHTML = "Pick a Set";
    document.getElementById("setDropdownButton").setAttribute("class", "btn w-50 btn-outline-light dropdown-toggle");
    document.getElementById("setName").innerHTML = "Set";
    setID = "";
    setPieceName = "";
    document.getElementById("typeName").innerHTML = setPieceName;
}


const sStatScore = async (sStatInput) => {
    try {
        const ssRef = sStatInput.dataset.substat
        if (subStatVID[ssRef] && rarityValue) {
            const Resp = await fetch(`/api/sub-stat-score?id=${subStatVID[ssRef]}&rarity=${rarityValue}`);
            const ssMV = await Resp.json();
            const ssIV = sStatInput.value
            subStatValue[ssRef] = ssIV
            document.getElementById("subStat"+ssRef).innerHTML = subStatID[ssRef]+": "+ssIV+" / "+ssMV;
        }
    } catch (e) {
    console.log(e)
    console.log("could not fetch sub stat max value")
    }
}

const submitClick = () => {
    if (setID && typeValue && mainStatID && subStatID[1] && subStatID[2] && subStatID[3] && subStatID[4] && rarityValue ) {
        const Save = new XMLHttpRequest();
        Save.open("POST", "/save-artifact", true);
        Save.setRequestHeader('Content-Type', 'application/json');
        Save.send(JSON.stringify({
            set: setID,
            type: typeValue,
            main: mainStatID,
            sub1: subStatID[1],
            sub2: subStatID[2],
            sub3: subStatID[3],
            sub4: subStatID[4],
            subv1: subStatValue[1],
            subv2: subStatValue[2],
            subv3: subStatValue[3],
            subv4: subStatValue[4],
            rarity: rarityValue,
            level: levelValue
        }))
    }
}

