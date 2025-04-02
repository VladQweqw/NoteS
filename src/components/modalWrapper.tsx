export default function ModalWrapper(props: any) {
   return(
      <div 
      onClick={(e) => {
         
         if((e.target as HTMLDivElement).classList.value === 'modal-wrapper') {
            props.setIsThemesModalOpen(false)
         }
      }}
      className="modal-wrapper">
         {props.children}
      </div>
   )
}