const input = "<text class='cell-input'type='text'>"
const num_input = "<input class='cell-input'type='number' min='0' value='0' style='text-align:right'>"
const NYA_FRONT_CSV = `Call sign:;;Name:;;Sheet no.;
            Date;${input_date};${input_date};${input_date};${input_date};${input_date};${input_date};${input_date}
            Animals of interest;;;;;;;
            ;;;;;;;
            ;;;;;;;
            ;;;;;;;
            Mamiriro ekunze?;;;;;;;
            Mvura? (mm);${num_input};${num_input};${num_input};${num_input};${num_input};${num_input};${num_input}
            Muka dzakafa;;;;;;;
            ;;;;;;;
            ;;;;;;;
            `

const NYA_FRONT_STYLE = nyamvuStyleFront()
