import React, {useEffect, useRef, useState} from "react";
import './.css'
import pointer from './assets/arrow_down.png'
import pointerUp from './assets/arrow_up.png'

export default function Dropdown(props){

    const [showOptions, setShowOptions] = useState(false)
    const [selected, setSelected] = useState()

    //state variables for multiselect
    const [multiSelected, setMultiSelected] = useState(()=>{
        if(props.isMultiSelect){
            var selectArray = []
            props.options.forEach((option) => selectArray.push({value:option, isSelected:false}))
            return selectArray
        }
        else{
            return []
        }
    })
    const [isMultiSelected, setIsMultiSelected] = useState(false)
    const [multiSelectText, setMultiSelectText] = useState(props.placeholder)

    //set width of element
    const textWidth = props.width? (Number(props.width) - 42).toString() + 'px' : "132px"
    const menuWidth = props.width? props.width.toString() + 'px': "180px"

    const useOutsideClick = (callback) => { //custom hook to detect hooks outside dropdown
        const ref = useRef();

        useEffect(() => {
            const handleClickOut = (e) => {
                if (ref.current && !ref.current.contains(e.target)){
                    callback();
                }
            }
            document.addEventListener('click', handleClickOut)
            return () =>{
                document.removeEventListener('click', handleClickOut)
            }
        }, [ref])
        return ref
    }
    const ref = useOutsideClick(handleClickOut)

    useEffect(() => { //passes the selected multiselect options to parent callback function
        var multiSelectResults = []
        var isAnySelected = false
        var tempMultiSelectText = ""
        multiSelected.forEach((option)=>{
            if(option.isSelected){
                multiSelectResults.push(option.value)
                isAnySelected = true
                tempMultiSelectText = tempMultiSelectText.length > 0? tempMultiSelectText + ", " + option.value : option.value
            }
        })
        isAnySelected? setMultiSelectText(tempMultiSelectText): setMultiSelectText(props.placeholder)
        setIsMultiSelected(isAnySelected)
        props.onSelect(multiSelectResults)
    }, [multiSelected])

    function handleClickOut(){//closes dropdown when user clicks outside
        setShowOptions(false)
    }
    function handleClick(){ //opens/closes dropdown when user clicks menu
        setShowOptions(!showOptions)
    }
    function handleSingleSelect(option){// sets or clears currently selected single select option
        if(option===selected){
            setSelected("")
            props.onSelect("")
        }
        else{
            setSelected(option)
            props.onSelect(option)
        }
    }
    function handleMultiSelect(i){ //sets currently selected multiselect options
        var multiTemp = multiSelected
        multiTemp[i].isSelected = !multiTemp[i].isSelected
        setMultiSelected([...multiTemp])
    }
    function handleSelectAll(){ //sets all multiselect options to selected
        var multiTemp = multiSelected
        multiTemp.forEach((option, i) => multiTemp[i].isSelected = true)
        setMultiSelected([...multiTemp])
        setIsMultiSelected(!isMultiSelected)
    }
    function handleDeselectAll(){ //sets all multiselect options to deselected
        var multiTemp = multiSelected
        multiTemp.forEach((option, i) => multiTemp[i].isSelected = false)
        setMultiSelected([...multiTemp])
        setIsMultiSelected(!isMultiSelected)
    }

    return( 
        <div className='customStyle-container' style={props.style}>
            <div ref={ref} style={{maxWidth:menuWidth}} className="dropdown-menu">
                {props.label? <div className="label">{props.label}</div> : null}
                <div className="selected" onClick={handleClick}>
                    <div className="selected-text" style={{width:textWidth}}>
                        {selected? selected :  isMultiSelected? multiSelectText : props.placeholder? props.placeholder : "Select"}
                    </div>
                    <img className="pointer" src={showOptions? pointerUp : pointer} width="20px"></img>
                </div>
                {showOptions? 
                    props.isMultiSelect? 
                            <div className="options-wrapper">
                                <div className="optionsList">
                                    {isMultiSelected? 
                                        <div className={"option-selected"} onClick={handleDeselectAll}>
                                            Deselect All
                                        </div>:
                                        <div className={"option"} onClick={handleSelectAll}>
                                            Select All
                                        </div> 
                                    } 
                                    {multiSelected.map((option, i) =>
                                        <div key={option.value} className={option.isSelected? "option-selected": "option"} onClick={() => handleMultiSelect(i)}>
                                            {option.value}
                                        </div>
                                    )}
                                </div>
                            </div>
                    :
                    <div className="options-wrapper">
                        <div className="optionsList">
                            {props.options.map((option) => 
                                <div key={option} className={option===selected? "option-selected" : "option"} onClick={() => handleSingleSelect(option)}>
                                    {option}
                                </div>
                            )}
                        </div>
                    </div>
                :null}
            </div>  
        </div>      
    )    
}