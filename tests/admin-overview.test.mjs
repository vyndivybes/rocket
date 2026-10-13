import test from 'node:test';
import assert from 'node:assert/strict';
import {renderAdminOverview} from '../public/admin-overview.js';

test('admin overview presents role and system metrics immediately without requiring a click',()=>{
  const markup=renderAdminOverview({
    students:1,parents:1,admins:1,totalTasks:2,completedTasks:1,
    linkedParents:1,configuredBoards:0,aiAttemptsToday:3,environment:'preview'
  });
  for(const label of ['Students','Parents','Administrators','Study tasks','Linked parent accounts','Boards configured','AI attempts today','Staging environment']){
    assert.ok(markup.includes(label),label);
  }
  assert.ok(markup.includes('3'), 'real metrics rendered');
  assert.ok(markup.includes('Staging environment'));
});
test('admin overview never renders student identities, conversations or study task titles',()=>{
  const markup=renderAdminOverview({
    students:1,parents:1,admins:1,totalTasks:1,completedTasks:0,
    linkedParents:1,configuredBoards:0,aiAttemptsToday:0,environment:'preview',
    username:'learner_demo',conversation:'Private confession',taskTitle:'Private study task'
  });
  assert.ok(!markup.includes('learner_demo'));
  assert.ok(!markup.includes('Private confession'));
  assert.ok(!markup.includes('Private study task'));
});
test('invalid count fields are not displayed as HTML or negative numbers',()=>{
  const markup=renderAdminOverview({students:'<script>alert(1)</script>',parents:-5,admins:1,totalTasks:0,environment:'preview'});
  assert.ok(!markup.includes('<script>'));
  assert.ok(!markup.includes('-5'));
  assert.match(markup,/Students/);
});
