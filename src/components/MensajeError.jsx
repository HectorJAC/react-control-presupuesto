/* eslint-disable react/prop-types */
export const MensajeError = ({children, tipo}) => {
    return (
        <div className={`alerta ${tipo}`}>
            {children}
        </div>
    )
};