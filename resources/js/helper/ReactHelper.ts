import React, { useState } from "react"

export function forceUpdate(){
    const [value, setValue] = useState(0)

    return () => setValue(value + 1)
}