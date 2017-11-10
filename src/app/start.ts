import startApplicationService from './services/application';
import startMarketService from './services/market';
import startAboutService from './services/about';
import { ISender, Sender } from './sender';
import { webTransport } from '../io/transport/web-transport';

export default function startServices(store) {
  let sender: ISender = new Sender(store, webTransport);
  sender.fetchAllData(() => {
    startApplicationService(sender, store);
    startMarketService(sender, store);
    startAboutService(sender, store);
  });
}
