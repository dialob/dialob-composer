import React from 'react';
import { Icon, Loader } from 'semantic-ui-react';
import { Dialob } from '../../global';


const StatusIndicator: React.FC<{ status: Dialob.EditorStatus }> = ({status}) => {

  if (status === 'STATUS_OK') {
    return <Icon name='check' color = 'green' fitted size = 'small' />;
  } else if (status === 'STATUS_BUSY') {
    return <Loader size='mini' inline active />;
  } else if (status === 'STATUS_WARNINGS') {
    return <Icon name='warning sign' color = 'yellow' fitted size = 'small' />;
  } else if (status === 'STATUS_ERRORS' || status === 'STATUS_FATAL') {
    return <Icon name='warning sign' color = 'red' fitted size = 'small' />;
  }
  return null;
}


export default StatusIndicator;