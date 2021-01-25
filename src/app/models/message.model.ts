export interface Message {
    messageId?: string,
    chatRoomId: string,
    content: string,
    sentBy: string,
    sentTo: string,
    timeStamp?: Date
}