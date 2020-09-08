class EncodingService {
	constructor(messageQueue) {
		this.messageQueue = messageQueue;
		this.messageQueue.process(async (job) => {});
	}

	searchByText = async (text, user) => {};
}
