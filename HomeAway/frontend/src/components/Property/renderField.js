import React from 'react'

const renderField = ({ input, label, type, className, style, meta: { touched, error } }) => (
    <div>
        <div>
            <input placeholder={label} type={type} className={className} style={style} {...input} />
            <div className="text-help" style={{'color':'red'}}>
            {touched && error && <span>{error}</span>}
            </div>
        </div>
    </div>
)

export default renderField

