import React , {useId} from 'react'

function Select({
    options,
    label,
    className = "",
    ...props
},ref) {
    const id = useId();
  return (
    <div className = 'w-full'>
        {/* //label hain tho display krwa do  */}
        {label && 
        <label htmlFor ={id}
        className = ''></label>}

        <select {...props}
        id = {id}
        ref = {ref}
        className = {`px-3 py-2 rounded-lg g-white
        text-black outline-none focus:bg-gray-50
        duration-200 border border-gray-200 w-full
        ${className}`}>
            {/* option returns array  option mai ho skta value na ho
            agr ni huyi tho loop krenge tho crash ho jaaye 
            isliyr conditional loop  */}
            {options?.map((option)=>(
                <option key = {option} value ={option}>
                    {options}
                </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)