/*************************************************
 * Copyright (c) 2016 Ansible, Inc.
 *
 * All Rights Reserved
 *************************************************/

import { templateUrl } from '../../shared/template-url/template-url.factory';

var hostEventModal = {
    name: 'jobDetail.host-event',
    url: '/task/:taskId/host-event/:eventId',
    controller: 'HostEventController',
    templateUrl: templateUrl('job-results/host-event/host-event-modal'),
    'abstract': false,
    resolve: {
        hostEvent: ['JobDetailService', '$stateParams', function(JobDetailService, $stateParams) {
            return JobDetailService.getRelatedJobEvents($stateParams.id, {
                id: $stateParams.eventId
            }).then(function(res) {
                return res.data.results[0]; });
        }],
        hostResults: ['JobDetailService', '$stateParams', function(JobDetailService, $stateParams) {
            return JobDetailService.getJobEventChildren($stateParams.taskId).then(res => res.data.results);
        }]
    },
    onExit: function() {
        // close the modal
        // using an onExit event to handle cases where the user navs away using the url bar / back and not modal "X"
        $('#HostEvent').modal('hide');
        // hacky way to handle user browsing away via URL bar
        $('.modal-backdrop').remove();
        $('body').removeClass('modal-open');
    }
};

var hostEventJson = {
    name: 'jobDetail.host-event.json',
    url: '/json',
    controller: 'HostEventController',
    templateUrl: templateUrl('job-results/host-event/host-event-codemirror')
};

var hostEventStdout = {
    name: 'jobDetail.host-event.stdout',
    url: '/stdout',
    controller: 'HostEventController',
        templateUrl: templateUrl('job-results/host-event/host-event-stdout')
};

var hostEventStderr = {
    name: 'jobDetail.host-event.stderr',
    url: '/stderr',
    controller: 'HostEventController',
    templateUrl: templateUrl('job-results/host-event/host-event-stdout')
};


export { hostEventJson, hostEventModal, hostEventStdout, hostEventStderr };
