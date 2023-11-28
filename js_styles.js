
function nyamvuStyleBack() {
    return {
        rows: {
            0: {style: {borderBottom: "solid 1px black"}},

            29: {style: {border: "none" , borderTop: "solid 2px black",borderBottom: "solid 2px black", padding:"10px"}}
        },
        cols: {
            0: {style: {width: "150px", borderRight:"solid 2px black", borderBottom:"solid 1px black",borderTop:"none"}}
        },
        cells: {
            "0_27": {style: {borderBottom: "none"}},
            "16_24": {attributes: {colspan: "2"}, style: {outline: "solid 1px black"}},
            "16_25": {attributes: {colspan: "2"}, style: {outline: "solid 1px black"}},
            "16_26": {attributes: {colspan: "2"}, style: {outline: "solid 1px black"}},
            "16_27": {attributes: {colspan: "2"}, style: {outline: "solid 1px black"}},
            "1_29": {attributes: {colspan: "30"}, style:{textAlign: "center"}},
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
            "0_10": {style: {borderBottom: "none"}},
            "0_11": {style: {borderBottom: "none"}},
            "0_13": {style: {borderBottom: "none"}},
            "0_14": {style: {borderBottom: "none"}},
        }
    }
}