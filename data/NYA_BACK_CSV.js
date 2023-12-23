const input_date = "<input type='text'class='cell-input'onchange='updateDates(this)' placeholder=' MM/DD/YYYY'>"
const NYA_BACK_CSV = `Species;B;M;B;M;B;M;B;M;B;M;B;M;B;M;B;M;B;M;B;M;B;M;B;M;B;M;B;M;B;M
            Mpala (Impala);;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
            ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
            ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
            Mphuluphulu (Kudu);;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
            ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
            Nkhwani (Bushbuck);;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
            ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
            Njovu (Elephant);;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
            Mvuu (Hippo);;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
            Njati (Buffalo);;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
            Chuzu (Waterbuck);;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
            Chiloko (Roan);;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
            ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
            Nyamalikiti (Giraffe);;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
            Munjili  (Warthog);;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
            ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
            Mbizi (Zebra);;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
            ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
            Nseula (Puku);;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
            Sanje (S. monkey);;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
            Cheta (V. monkey);;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
            Khola (Sable);;;;;;;;;;;;;;;;Kanga (Crested);;;;;;;;;;;;
            Numbu (Wildebeest);;;;;;;;;;;;;;;;Kanga (Helmeted);;;;;;;;;;;;
            Insha (Duiker);;;;;;;;;;;;;;;;M'ng'omba;;;;;;;;;;;;
            Kolwe (Baboon);;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
            Mwena (Crocodile);;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
            Khonze (Hartebeest);;;;;;;;;;;;;;;;;;;;Kaingo;;;;;;;;
            Ngulube (Bushpig);;;;;;;;;;;;;;;;;;;;Chimwi;;;;;;;;
            Kafundo (Grysbuck);;;;;;;;;;;;;;;;;;;;Kalamo;;;;;;;;
            Chinkoma (Klipspringer);;;;;;;;;;;;;;;;;;;;Nimbulu;;;;;;;;
            Nungu (Porcupine);;;;;;;;;;;;;;;;;;;;Kandwe;;;;;;;;
            Nkoka (Pangolin);;;;;;;;;;;;;;;;;;;;Fungofungo;;;;;;;;
            ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
            Wayenda kuti lero?;* Species not on the list must be added in the open space or placed under the "off-interest" section;;;;;;
            Date;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
            ${input_date};;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
            ${input_date};;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
            ${input_date};;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
            ${input_date};;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
            ${input_date};;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
            ${input_date};;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
            ${input_date};;;;;;;;;;;;;;;;;;;;;;;;;;;;;;`; 


const NYA_BACK_STYLE = nyamvuStyleBack()
