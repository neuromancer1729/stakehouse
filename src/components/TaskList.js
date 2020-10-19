import React from "react";
import { List } from "@react95/core";
import styled from "@xstyled/styled-components";

const ListItem = styled(List.Item)`
  ${({ smallIcon }) =>
    smallIcon
      ? `
  i {
    padding: 4px;
    background-origin: content-box;
    flex-shrink: 0;
  }
  `
      : ""}
`;

const Link = styled.a.attrs({
  target: "_blank",
  rel: "noopener noreferrer"
})`
  flex-grow: 1;
  height: 30;
  padding-top: 9;
  text-decoration: none;
  color: inherit;
`;

const TaskList = ({ openLoginModal, isLoggedin, logout }) => (
  <List>
    { !isLoggedin && (
              <List.Item icon="progman_33" onClick={() => openLoginModal(true)}>
                Login
              </List.Item>)
              }
              { isLoggedin && (
                <List.Item icon="progman_39" onClick={() => logout()}> 
                Logout
                </List.Item>
              )

              }
    <List.Divider />
    <ListItem icon="computer_3">
      <Link href="https://github.com/neuromancer1729/stakehouse">Github</Link>
    </ListItem>
  </List>
);

export default TaskList;
