/**
 * Create a short-lived room for demo purposes.
 *
 * IMPORTANT: this is purely a "demo-only" API, and *not* how we recommend
 * you create rooms in real production code. In your code, we recommend that you:
 * - Create rooms by invoking the Daily.co REST API from your own backend server
 *   (or from the Daily.co dashboard if you're OK with creating rooms manually).
 * - Pass an "exp" (expiration) parameter to the Daily.co REST endpoint so you
 *   don't end up with a huge number of live rooms.
 *
 * See https://docs.daily.co/reference#create-room for more information on how
 * to use the Daily.co REST API to create rooms.
 */
async function createRoom(roomName) {
  let response = await fetch("https://api.daily.co/v1/rooms", {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Bearer d9e67deea66b4dc2d8eedcf86dc370ea06c03eb0b9bcfc67f5c9d3728a8698ed"
    },
    "body": '{"properties":{"enable_chat":true,"start_video_off":true,"enable_screenshare":false,"enable_knocking":false,"autojoin":true},"name":"' + roomName +'"}'
  }),
    room = await response.json();
  return room;

  // Comment out the above and uncomment the below, using your own URL
  // return { url: "https://your-domain.daily.co/hello" };
}

export default { createRoom };
