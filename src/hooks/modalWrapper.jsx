export default function ModalWrapper(props) {
   return(
      <div 
      onClick={(e) => {
         if(e.target.classList.value === 'modal-wrapper') {
            props.setIsThemesModalOpen(false)
         }
      }}
      className="modal-wrapper">
         {props.children}
      </div>
   )
}