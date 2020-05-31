import React, { useState, useMemo } from 'react';
import { Button, Icon, Form } from 'semantic-ui-react';
import { ObjectItemInput, ObjectItemComponentProps } from '../types';
import { reportError, uploadToCloudinary } from '../utils';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { useUserPublicInfo } from '../DB';
import { CommentsList, PostCommentWidget } from './Comments';
import './Story.css';
import cx from 'classnames';
import { LikeWidget } from './LikeWidget';
import { FullScreenContainer } from './FullScreenContainer';
import { TakePicture } from './TakePicture';
import NonCart from '../interface/noncart';

export const StoryItem: React.FC<
  ObjectItemComponentProps & { onBack?: () => void }
> = ({
  item,
  user,
  userVoted,
  votes,
  comments,
  expanded,
  onClick,
  onVote,
  onComment,
  onClose,
  onBack,
}) => {
  const { author, title, description, created, logoURL } = item;

  const authorInfo = useUserPublicInfo(author, true);

  const [showCommentsWidget, setShowCommentsWidget] = useState(false);

  const commentsCount = comments?.length || 0;

  const sortedComments = useMemo(() => {
    if (!comments) return comments;
    return comments.sort((l, r) => (l.created < r.created ? -1 : 1));
  }, [comments]);

  const icon = 'edit outline';

  if (expanded) {
    return (
      <NonCart
        name={title}
        description={description}
        link={logoURL}
        data={created}
        author={authorInfo?.name}
        onClose={onBack}
      />
    );
  }
  return (
    <div
      className={cx({ item: true, 'story-item': true, expanded })}
      onClick={onClick}
    >
      {expanded && !!logoURL && <img style={{ height: 250 }} src={logoURL} />}
      <div className="title">
        <Icon name={icon} />
        {title}
      </div>
      {expanded && (
        <div className="author-created">
          <Link to={`/users/${author}`}>{authorInfo?.name || 'Anonymous'}</Link>{' '}
          on {new Date(created).toLocaleString()}
        </div>
      )}
      <br />
      {expanded && description !== title && (
        <section className="description">{description}</section>
      )}
      {!!commentsCount && (
        <div className="replies-count">{commentsCount} replies</div>
      )}
      <div className="actions">
        <LikeWidget votes={votes} userVoted={userVoted} onVote={onVote} />

        <div>
          {expanded && user?.uid === author && (
            <Button
              icon="close"
              content="Delete"
              basic
              onClick={() => {
                if (window.confirm('Are you sure you want to close it?'))
                  onClose().catch(reportError);
              }}
            />
          )}
          {!showCommentsWidget && !expanded && (
            <Button
              basic
              onClick={(e) => {
                e.stopPropagation();
                setShowCommentsWidget(true);
              }}
            >
              Reply
            </Button>
          )}
        </div>
      </div>
      {expanded && !!commentsCount && (
        <section>
          <h4 className="pale-heading">Replies</h4>
          <CommentsList comments={sortedComments!} />
        </section>
      )}
      {(showCommentsWidget || expanded) &&
        (!!user ? (
          <PostCommentWidget onComment={onComment} />
        ) : (
          <div style={{ textAlign: 'center' }}>
            You need to register or sign in to be able to post
          </div>
        ))}
    </div>
  );
};

const { REACT_APP_CLOUDINARY_CLOUD_NAME } = process.env;
const uploadImage = (image: string) =>
  uploadToCloudinary(REACT_APP_CLOUDINARY_CLOUD_NAME!, image);

export const AddNewStoryObject: React.FC<{
  type: ObjectItemInput['type'];
  onPost: (data: ObjectItemInput) => void;
  onClose: () => void;
}> = ({ type, onPost, onClose }) => {
  const [state, setState] = useState({ valid_until: 12 * 60 } as any);
  const onChange = (e: any) => {
    const { name, value } = e.target;
    console.debug(e.target.name, e.target.value);
    setState({ ...state, [name]: value });
  };

  if (!state.logoURL)
    return (
      <FullScreenContainer>
        <TakePicture
          // onClose={() => setTakePicture(false)}
          onClose={onClose}
          onPictureTaken={async (image) => {
            // console.log('image', image);
            const info = await uploadImage(image);
            console.log('returned info', info);
            setState({ ...state, logoURL: info.url });
            // setTakePicture(false);
            // setAddType('story');
          }}
        />
      </FullScreenContainer>
    );

  return (
    <div className="add-new-story">
      <h4>
        <Icon name="edit outline" /> Create story
      </h4>
      <img style={{ height: 250 }} src={state.logoURL} />
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          console.debug('submit', state);
          const { topic, message, valid_until, logoURL } = state;

          onPost({
            type,
            title: topic || message,
            description: message,
            logoURL,
            valid_until: '2100-01-01', // dayjs().add(valid_until, 'minute').toISOString(),
          });
        }}
      >
        <Form.Input
          autoComplete="off"
          label="Subject"
          name="topic"
          onChange={onChange}
        />
        <Form.TextArea
          autoFocus
          label="Story"
          name="message"
          onChange={onChange}
        />

        <Form.Button primary>Post</Form.Button>
      </Form>
    </div>
  );
};
