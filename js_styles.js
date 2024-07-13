
function nyamvuStyleBack() {
    return {
        rows: {
             0: {style: {borderBottom: "solid 1px black"}},
            30: {style: {border: "none" , borderTop: "solid 2px black",borderBottom: "solid 2px black", padding:"10px"}}
        },
        cols: {
            0: {style: {width: "150px", borderRight:"solid 2px black", borderBottom:"solid 1px black",borderTop:"none"}}
        },
        cells: {
            "0_1": {style: {borderBottom: "none"}},
            "0_2": {style: {borderBottom: "none"}},
            "0_4": {style: {borderBottom: "none"}},
            "0_6": {style: {borderBottom: "none"}},
            "0_14": {style: {borderBottom: "none"}},
            "16_21": {attributes: {colspan: "3"}, style: {outline: "solid 1px black"}},
            "16_20": {attributes: {colspan: "3"}, style: {outline: "solid 1px black"}},
            "20_25": {attributes: {colspan: "3"}, style: {outline: "solid 1px black"}},
            "20_26": {attributes: {colspan: "3"}, style: {outline: "solid 1px black"}},
            "20_27": {attributes: {colspan: "3"}, style: {outline: "solid 1px black"}},
            "20_28": {attributes: {colspan: "3"}, style: {outline: "solid 1px black"}},
            "20_29": {attributes: {colspan: "3"}, style: {outline: "solid 1px black"}},
            "20_30": {attributes: {colspan: "3"}, style: {outline: "solid 1px black"}},
            "1_30": {attributes: {colspan: "24"}, style:{textAlign: "center"}},
        }
    }
}

function nyamvuStyleFront(){
    return {
        rows: {
            0: {style: {borderBottom: "solid 1px black"}}
        },
        cols: {
            0: {style: {width: "150px", borderRight:"solid 2px black", borderBottom:"solid 1px black",borderTop:"none"}}

        },
        cells: {
            "4_0": {attributes: {colspan: 2}, style: {textAlign: "right"}},
            "5_0": {attributes: {colspan: 2}},
            "0_2": {style: {borderBottom: "none"}},
            "0_3": {style: {borderBottom: "none"}},
            "0_4": {style: {borderBottom: "none"}},
            "0_8": {style: {borderBottom: "none"}},
            "0_9": {style: {borderBottom: "none"}},
            "0_10": {style: {borderBottom: "none"}},
        }
    }
}
