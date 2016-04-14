import startApplicationService from './services/application';
import startMarketService from './services/market';
import startAboutService from './services/about';
import Sender from './sender';

export default function startServices() {
  let sender = new Sender();
  startApplicationService(sender);
  startMarketService(sender);
  startAboutService(sender);
}
