import startApplicationService from './services/application';
import startMarketService from './services/market';
import Sender from './sender';

export default function startServices() {
  let sender = new Sender();
  startApplicationService(sender);
  startMarketService(sender);
}
