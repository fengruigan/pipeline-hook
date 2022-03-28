const router = require("express").Router(),
  axios = require("axios").default,
  uuid = require("uuid").v4;

let BUILDER_DOCKER_URL =
  process.env.ENV == "prod"
    ? process.env.BUILDER_DOCKER_URL
    : "https://localhost:9000/2015-03-31/functions/function/invocations";

router.post("/", async (req, res) => {
  let original = req.body;
  let ref;
  try {
    ref = original.ref;
    let split = ref.split("/");
    let branch = split[split.length - 1];
    if (branch !== "main") return;
  } catch (err) {
    console.log(err);
    return;
  }
  // repository
  //     owner
  //         login
  //     name
  //     url
  // pusher
  //     name
  // head_commit
  //     id
  //     author
  //     timestamp
  //     message
  //     commiter
  //         name
  let content = "Hi Discord";
  let message = "OK";
  let buildId = uuid();
  try {
    let headCommitInfo = `
              ID: ${original.head_commit.id}
              Timestamp: ${original.head_commit.timestamp}
              Author: ${original.head_commit.author.username}
              Message: ${original.head_commit.message}
              Committer: ${original.head_commit.committer.name}`;
    content = `BuildID: ${buildId}
          Repository: **${original.repository.name}**
          Owner: ${original.repository.owner.login}
          Repo URL: ${original.repository.url}
          Pusher: ${original.pusher.name}
          Head Commit: ${original.head_commit !== null ? headCommitInfo : "Null"}`;
  } catch (err) {
    console.log(err);
  }

  let msg = {};
  msg.content = content;
  try {
    await axios.post(process.env.DISCORD_HOOK, msg);
  } catch (err) {
    message = "NOT OK";
    console.log(err);
  }

  // start saving build request info to database
  // build target info
  //     repo name
  //     repo owner
  //     headcommit id
  // build state

  // start build
  let buildResult;
  let body = {
    env: {},
    data: {
      buildId: buildId,
      repoOwner: original.repository.owner.login,
      repoName: original.repository.name,
      headCommitId: original.head_commit.id,
    },
  };
  let headers = {
    "Content-Type": "application/json",
  };
  try {
    buildResult = await axios.post(BUILDER_DOCKER_URL, body, headers);
  } catch (err) {
    message = "Build error";
    console.log(err);
  }

  // update build request to reflect build result
  // send message to discord

  res.send(message);
});

module.exports = router;
