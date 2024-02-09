import React from "react";

function Profile(props) {
  return (
    <svg
      className={props.className}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xlink="http://www.w3.org/1999/xlink"
      width="17"
      height="20"
      viewBox="0 0 17 20"
      fill="none"
    >
      <path
        d="M8.66797 13.1739C13.0066 13.1739 16.668 13.8789 16.668 16.599C16.668 19.32 12.9826 20 8.66797 20C4.33034 20 0.667969 19.295 0.667969 16.575C0.667969 13.8539 4.35335 13.1739 8.66797 13.1739ZM8.66797 0C11.6071 0 13.962 2.35402 13.962 5.29105C13.962 8.22808 11.6071 10.5831 8.66797 10.5831C5.72987 10.5831 3.37398 8.22808 3.37398 5.29105C3.37398 2.35402 5.72987 0 8.66797 0Z"
        fill={props.color}
      />
    </svg>
  );
}

export default Profile;
