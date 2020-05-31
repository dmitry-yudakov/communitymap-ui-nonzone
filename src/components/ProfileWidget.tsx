import React, { useState, useEffect } from 'react';
import { useAuth } from '../Auth';
import { useMyDirectMessages } from '../DB';
import firebase from 'firebase';
import { Login } from '.';
import {
  Modal,
  Dropdown,
  Button,
  Icon,
  Label,
  Form,
  Loader,
  Message,
  Card,
  Image,
  Grid,
} from 'semantic-ui-react';
import { Button as Button2 } from '../interface/components/library';
import './ProfileWidget.css';
import { useUserPublicInfo, useAsyncStatus, saveUserPublicInfo } from '../DB';
import { Link } from 'react-router-dom';

export const ProfileWidget: React.FC = () => {
  const user = useAuth();
  const { dialogs } = useMyDirectMessages();
  const unreadDialogs =
    dialogs?.filter((dlg) => dlg.lastMsgId !== dlg.lastReadBy[user?.uid || ''])
      .length || 0;

  const [login, setLogin] = useState(false);
  useEffect(() => {
    if (user && login) {
      setLogin(false);
    }
  }, [user, login]);

  const [showProfile, setShowProfile] = useState(false);

  const signOut = () => firebase.auth().signOut();

  return (
    <div id="profile-widget">
      {login && <Login title="" />}
      {showProfile && !!user && (
        <Modal open closeIcon onClose={() => setShowProfile(false)}>
          <Modal.Header>Your profile</Modal.Header>
          <Modal.Content>
            <EditUserProfile user={user} />
          </Modal.Content>
        </Modal>
      )}
      {user ? (
        <Dropdown
          trigger={
            <Button className="profile-button" icon size="large">
              <Icon.Group>
                <Icon name="user outline" />
                {unreadDialogs > 0 && (
                  <Icon
                    corner="top right"
                    className="has-unread-messages"
                    name="mail"
                    color="red"
                  />
                )}
              </Icon.Group>
            </Button>
          }
          pointing="top right"
          icon={null}
        >
          <Dropdown.Menu>
            <Dropdown.Item disabled>{user.email}</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => setShowProfile(true)}>
              <Icon name="user" />
              Profile
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/my-messages">
              <Icon name="mail" />
              Messages
              {unreadDialogs > 0 && (
                <Label className="user-menu-label" color="blue">
                  {unreadDialogs}
                </Label>
              )}
            </Dropdown.Item>
            <Dropdown.Item onClick={signOut}>
              <Icon name="log out" />
              Log out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        // <Button primary size="large" onClick={() => setLogin(true)}>
        //   Sign in
        // </Button>
        <Button2
          // class={'app__login app__button--svg'}
          class={'app__button--svg'}
          func={() => setLogin(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enable-background="new 0 0 24 24"
            viewBox="0 0 24 24"
            fill="white"
            width="18px"
            height="18px"
          >
            <g>
              <rect fill="none" height="24" width="24" />
            </g>
            <g>
              <path d="M11,7L9.6,8.4l2.6,2.6H2v2h10.2l-2.6,2.6L11,17l5-5L11,7z M20,19h-8v2h8c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-8v2h8V19z" />
            </g>
          </svg>
          Login
        </Button2>
      )}
    </div>
  );
};

const EditUserProfile: React.FC<{ user: firebase.User }> = ({ user }) => {
  const [toggled, setToggle] = useState(false);
  const info = useUserPublicInfo(user.uid, true);
  const [changed, setChanged] = useState<{ name: string } | null>(null);

  const { status, func: saveInfo } = useAsyncStatus(async () => {
    return saveUserPublicInfo({
      ...(info || { id: user.uid }),
      ...(changed || { name: '' }),
    });
  });

  if (info === undefined) return <Loader active />;
  // if (info === null) return <div>User not found :(</div>;
  const UserForm = () => (
    <Form
      onSubmit={() => saveInfo()}
      loading={status.pending}
      error={!!status.error}
      success={status.success}
    >
      <Form.Input
        label="Name/Nickname"
        required
        value={changed?.name || info?.name || ''}
        onChange={(e, { value }) => setChanged({ ...changed, name: value })}
      />
      {/* <Form.Input label="Gender"/> */}

      <Message error>{status.error}</Message>
      <Message success>Successfully saved</Message>

      <Form.Group>
        <Form.Button primary disabled={!changed}>
          Save
        </Form.Button>
        <Form.Button
          type="button"
          disabled={!changed}
          onClick={() => setChanged(null)}
        >
          Clear changes
        </Form.Button>
      </Form.Group>
    </Form>
  );
  const BtnSettings = () => (
    <Button
      circular
      icon="settings"
      onClick={() => setToggle((toggled) => !toggled)}
    />
  );

  return (
    <Card>
      <Image
        src="http://dwinery.com/ocm/wp-content/uploads/elementor/thumbs/avatar-ookvknm0adkt2o1cwyctxzbsfccgeo4fo00qr8xhao.png"
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>
          <Grid>
            <Grid.Column floated="left" width={8}>
              {info?.name}
            </Grid.Column>
            <Grid.Column floated="right" width={3}>
              {BtnSettings()}
            </Grid.Column>
          </Grid>
        </Card.Header>
        <Card.Meta>
          <span className="date">Joined in: {info?.created}</span>
        </Card.Meta>
        <Card.Description>{toggled && <>{UserForm()}</>}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column>
              <Icon name="handshake" /> 11 People
            </Grid.Column>
            <Grid.Column>
              <Icon name="globe" /> 12 Places
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Content>
    </Card>
  );
};
