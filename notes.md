| NON REST           | REST                                                               |
| :----------------- | :----------------------------------------------------------------- |
| /listAllHubs       | GET /hubs                                                          |
| /createHub         | POST /hubs                                                         |
| /updateHub         | PUT /hubs                                                          |
| /listHubMessages   | GET /hubs/:id/messages                                             |
| /listPostComments  | GET /posts/:id/comments                                            |
| /countPostComments | GET /posts/:id/comments with an extra property { comments, count } |

read data from client:

- body (req.body)
- url parameters (req.params)
- query string (req.query)

https://www.google.com/search
?
newwindow = 1
&
ei = w8gkXYmfCPGCk-4PpaiQ2AQ&q=mdn+query+string+&oq=mdn+query+string+
&
gs_l = psy-ab.3..0j0i22i30.11606.11606..11799...0.0..0.80.80.1......0....1..gws-wiz.......0i71.orS3-8lAcIc

```js
req.query = {
  newwindow: 1,
  ei: adsflkjadflasdf,
  gs_l: yesadfadfasdfad,
};
```
