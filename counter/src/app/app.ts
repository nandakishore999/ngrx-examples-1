import {Component} from 'angular2/core';
import {Counter} from './components/counter';
import {LogMonitor} from 'ngrx-store-devtools-next';

@Component({
	selector: `app`,
	template: `
	<div id="layout" class="pure-g">
		<div class="sidebar pure-u-1 pure-u-md-1-4">
			<div class="header">
				<h1 class="brand-title">NgRx Store</h1>
				<h2 class="brand-tagline">Example #1 - Basic Counter</h2>
			</div>
		</div>
		<div class="content pure-u-1 pure-u-md-3-4">
			<counter></counter>
		</div>
	</div>
	<log-monitor></log-monitor>
	`,
    directives: [Counter, LogMonitor]
})
export class App {}