import test from 'node:test';import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {safePublicLink,chooseLink} from '../local-companion/extension/browser-tools.js';
const manifest=JSON.parse(readFileSync(new URL('../local-companion/extension/manifest.json',import.meta.url),'utf8'));
test('extension is manually invoked with only activeTab and scripting permissions',()=>{
 assert.equal(manifest.manifest_version,3);
 assert.deepEqual(manifest.permissions,['activeTab','scripting']);
 assert.equal(manifest.host_permissions,undefined);
 assert.equal(manifest.background,undefined);
});
test('selected educational link navigation rejects scripts, local protocols and suspicious IPs',()=>{
 assert.equal(safePublicLink('https://www1.grc.nasa.gov/'),'https://www1.grc.nasa.gov/');
 for(const s of ['javascript:alert(1)','http://example.org','file:///C:/private','chrome://settings','https://127.0.0.1/','https://192.168.1.5/','https://172.16.1.5/','https://localhost/','https://evil.com:8080/'])assert.equal(safePublicLink(s),null,s);
 const items=[{label:'Learn about aircraft lift',href:'https://www1.grc.nasa.gov/'},{label:'Secret local',href:'http://127.0.0.1/'}];
 assert.deepEqual(chooseLink(items,'aircraft'),items[0]);assert.equal(chooseLink(items,'local'),null);
});
