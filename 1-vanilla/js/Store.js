import { TabType } from "./views/TabView.js";

const tag = "[store]";

export default class Store {
  constructor(storage) {
    console.log(tag, "constructor");

    if (!storage) throw "no storage";

    this.storage = storage;

    this.reset();
  }

  reset(){
    this.searchKeyword = '';
    this.searchResult = [];
    this.selectedTab = TabType.KEYWORD;
  }

  search(keyword) {
    this.searchKeyword = keyword;
    this.searchResult = this.storage.productData
	    .filter(product => product.name.includes(keyword));
	this.saveHistory(keyword);
  }

  getKeywordList() {
    return this.storage.keywordData;
  }
  
  getHistoryList() {
	  return this.storage.historyData.sort(this._sortHistory);
  }
  
  _sortHistory(history1, history2) {
	  return history2.date > history1.date;
  }
  
  	removeHistory(id) {
		this.storage.historyData = this.storage.historyData
			.filter(history => history.id.toString() !== id);
	}
	
	saveHistory(keyword) {
		// 같은 키워드라도 저장하게 해봤음
		// production 환경에서는 safety thread 필요
		const historyData = this.storage.historyData;
		const lastHistoryDataItem = this.storage.historyData.at(historyData.length - 1);
		const newHistoryDataItem = {
			id: lastHistoryDataItem.id + 1,
			keyword: keyword,
			date: new Date(),
		}
		this.storage.historyData.push(newHistoryDataItem)
	}
	
}
