
export default function TopSidebar(props: {
  searchNotes: (args0: string) => void,
  sortNotes: () => void,
  sortedAscdending: boolean
}) {  

  return (
    <div className="top-sidebar sidebar-side">
      <div className="search-wrapper">
        <input onChange={(e) => {
          props.searchNotes(e.target.value)
        }} type="search" name="Search notes" id="search-field" placeholder='Search...' />
      </div>

      <div className="sidebar-options">
        <span onClick={() => {
          props.sortNotes()
        }}>
          <svg className='svg' viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_10_67)">
              <path d="M3.5 9L7.5 5L11.5 9M7.5 5V19" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21.5 15L17.5 19L13.5 15M17.5 19V5" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
              <clipPath id="clip0_10_67">
                <rect width="24" height="24" fill="#FFF" transform="translate(0.5)" />
              </clipPath>
            </defs>
          </svg>
        </span>

        <span onClick={() => {
        }} className="filter">
          <span className="create-note" id='create-note'>
            <svg className='svg' viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_11_14244)">
                <path d="M17.4167 3.5V8.16667C17.4167 8.47609 17.544 8.77283 17.7706 8.99162C17.9972 9.21042 18.3045 9.33333 18.625 9.33333H23.4583" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21.0417 24.5H8.95832C8.31738 24.5 7.70269 24.2542 7.24948 23.8166C6.79627 23.379 6.54166 22.7855 6.54166 22.1667V5.83333C6.54166 5.21449 6.79627 4.621 7.24948 4.18342C7.70269 3.74583 8.31738 3.5 8.95832 3.5H17.4167L23.4583 9.33333V22.1667C23.4583 22.7855 23.2037 23.379 22.7505 23.8166C22.2973 24.2542 21.6826 24.5 21.0417 24.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 12.8333V19.8333" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M11.375 16.3333H18.625" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              <defs>
                <clipPath id="clip0_11_14244">
                  <rect width="29" height="28" fill="white" transform="translate(0.5)" />
                </clipPath>
              </defs>
            </svg>
          </span>
        </span>
      </div>

    </div>
  )
}