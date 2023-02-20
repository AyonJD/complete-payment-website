import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SidebarLinkGroup({
  children,
  activecondition,
}) {

  const [open, setOpen] = useState(activecondition);
  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(!open);
  }

  return (
    <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${activecondition && 'active_menu'}`}>
      {children(handleClick, open)}
    </li>
  );
}

export default SidebarLinkGroup;