import { hashHistory } from 'react-router';

export function gotoHome() {
  hashHistory.push('/');
}

export function gotoAbout() {
  hashHistory.push('/about');
}
