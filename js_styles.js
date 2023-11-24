function nyamvuStyleBack() {
    return {
        rows: {
            //33: {style: {borderBottom: "solid 2px black"}},
            //33: {content: "", style: {border: "none", height: "1.5rem"}},
            34: {style: {border: "none" , borderTop: "solid 2px black",borderBottom: "solid 2px black", padding:"10px"}}
        },
        cols: {
            0: {style: {width: "150px"}}
        },
        cells: {
            "11_22": {attributes: {colspan: "3"}},
            "11_23": {attributes: {colspan: "3"}},
            "11_24": {attributes: {colspan: "3"}},
            "15_27": {attributes: {colspan: "3"}},
            "15_28": {attributes: {colspan: "3"}},
            "15_29": {attributes: {colspan: "3"}},
            "15_30": {attributes: {colspan: "3"}},
            "15_31": {attributes: {colspan: "3"}},
            "15_32": {attributes: {colspan: "3"}},
            "1_34": {attributes: {colspan: "24"}, style:{textAlign: "center"}},
        }
    }
}

function nyamvuStyleFront(){
    return {
        rows: {},
        cols: {},
        cells: {
            "4_0": {attributes: {colspan: 2}, style: {textAlign: "right"}}
        }
    }
}