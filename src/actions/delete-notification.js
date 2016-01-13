import fetch from 'isomorphic-fetch';
import {getConfig} from '../config';
import {clearError, setError} from './error';

//Import other actions
import {readNotification, readNotificationGroup} from './';

//Notification actions
export const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION';
export const SUCCESS_DELETE_NOTIFICATION = 'SUCCESS_DELETE_NOTIFICATION';
export const FAIL_DELETE_NOTIFICATION = 'FAIL_DELETE_NOTIFICATION';

//Notification group actions

export const DELETE_NOTIFICATION_GROUP = 'DELETE_NOTIFICATION_GROUP';
export const SUCCESS_DELETE_NOTIFICATION_GROUP = 'SUCCESS_DELETE_NOTIFICATION_GROUP'
export const FAIL_DELETE_NOTIFICATION_GROUP = 'FAIL_DELETE_NOTIFICATION_GROUP';

function deleteNotificationSuccess(jsonDeleted) {
    return {
        type: SUCCESS_DELETE_NOTIFICATION,
        payload: jsonDeleted
    };
}

//
function deleteNotificationGroupSuccess(notificationIds) {
    return {
        type: SUCCESS_DELETE_NOTIFICATION_GROUP,
        payload: notificationIds
    };
}

//
export function deleteNotification(notificationId) {
    return function callDeleteNotification(dispatch) {
        //read the conf after extension.
        const config = getConfig();
        //Create the URL
        const URL = `${config.rootURL}/${config.notificationURL}`;
        //Maybe see https://github.com/rackt/redux/issues/911#issuecomment-149361073 for a saner implementation instead of chaining two dispatch.
        dispatch(clearError());
        dispatch(readNotification(notificationId));
        return fetch(`${URL}/${notificationId}`, {method: 'delete', credentials: 'include'})
        .then(response => response.json())
        .then(json => dispatch(deleteNotificationSuccess(json)))
        .catch(err => dispatch(setError({content: err.message, type: 'network'})));
    }
}

//
export function deleteGroupNotification(notificationIds) {
    return function callDeleteNotificationGroup(dispatch) {
        //read the conf after extension.
        const config = getConfig();
        //Create the URL
        const URL = `${config.rootURL}/${config.notificationURL}`;
        //Maybe see https://github.com/rackt/redux/issues/911#issuecomment-149361073 for a saner implementation instead of chaining two dispatch.
        dispatch(clearError());
        dispatch(readNotificationGroup(notificationIds));
        return fetch(`${URL}`, {method: 'delete', body: JSON.stringify(notificationIds), credentials: 'include'})
        .then(response => response.json())
        .then(json => dispatch(deleteNotificationGroupSuccess(json)))
        .catch(err => dispatch(setError({content: err.message, type: 'network'})));
    }
}
