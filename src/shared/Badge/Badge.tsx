import classNames from "classnames"
import './style.scss'
// import { Children } from "react"


interface BadgeProps {
    text: string,
    color: string,
    children?: React.ReactNode
}

function Badge({text, color, children}: BadgeProps) {
    
    return <div className={classNames([
        'badge',
        "badge--" + color
    ])}>
        <div className="badge__text">
          {text}
        </div>

        {children}
    </div>
}

export default Badge