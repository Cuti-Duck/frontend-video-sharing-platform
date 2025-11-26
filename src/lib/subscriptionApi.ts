import axiosClient from "./axiosClient";

const SubscriptionApi = {
    Subscribe: (channelId: string) => axiosClient.post("/subscriptions/subscribe", {channelId}),
    UnSubscribe: (channelId: string) => axiosClient.post("/subscriptions/unsubscribe", {channelId}),
    MySubscribedchannel: () => axiosClient.get("/subscriptions/mysubscribedchannel"),
    GetSubscriber: (channelId: string) => axiosClient.get(`/subscriptions/channel/${channelId}/subscribers`)
}
export default SubscriptionApi;