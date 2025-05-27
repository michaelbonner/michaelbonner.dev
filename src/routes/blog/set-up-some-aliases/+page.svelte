<script lang="ts">
	import ogImage from '$lib/images/iterm-aliases-trimmed-600.jpg';
	import { Highlight } from 'svelte-highlight';
	import bash from 'svelte-highlight/languages/bash';
	import Seo from '../../../components/Seo.svelte';

	import 'svelte-highlight/styles/github-dark.css';
</script>

<Seo
	description="Aliases can speed up your development and help you focus on code"
	title="Set up some aliases | Michael Bonner"
	{ogImage}
	ogType="article"
/>

<svelte:head>
	<meta property="article:published_time" content="2021-07-15T22:00:00.000Z" />
	<meta name="publish_date" property="og:publish_date" content="2021-07-15T22:00:00.000Z" />

	<link rel="canonical" href="https://michaelbonner.dev/blog/set-up-some-aliases" />
</svelte:head>

<div class="container mx-auto px-8 py-12">
	<div class="prose dark:prose-invert max-w-3xl">
		<div class="pt-8">
			<div class="lg:pt-24">
				<div>
					<h1 class="text-4xl leading-relaxed tracking-wide lg:pr-8">Set up some aliases</h1>
				</div>
			</div>
			<div class="max-w-5xl text-lg lg:mt-32">
				<p>Bash aliases are amazing, just set them up.</p>
				<h2>What are bash aliases?</h2>
				<p>
					Bash aliases are shortcuts. They reduce the key strokes, and increase efficiency. You just
					type a short, easy to remember shortcut, and bash will execute the full command. Why type
					out&nbsp;
					<code>git status</code> when you could type <code>gs</code>? Whey type out
					<code>git checkout origin master</code>
					when you could just type <code>gcm</code>?
				</p>
				<h2>How to set them up</h2>
				<p>
					First, identify which version of shell you&apos;re using and where &apos;s configuration
					file is. Usually, on a mac, it&apos;s in a file at <code>~/.bash_profile</code>. I use
					zsh, so mine is at <code>~/.zshrc</code>. An easy way to test is to add a sample alias,
					and try executing it after refreshing the shell or sourcing your config file.&nbsp;
					<code>e.g. source ~/.zshrc</code>. I keep my aliases in a file at <code>~/.aliases</code>
					and then add&nbsp;
					<Highlight class="p-0" code="source ~/.aliases" language={bash} />
					<code>source ~/.aliases</code> to my <code>~/.zshrc</code>.
				</p>
				<p>
					Once you identify which file to edit, all you need to do is add something like the
					following:
				</p>
				<Highlight class="p-0" code="alias gs='git status'" language={bash} />
				<p>
					In the above example, `gs` is the text you will type, and the text in the quotes is the
					command that will be executed.
				</p>
				<h2>My aliases</h2>
				<p>Here are the aliases that I use</p>
			</div>
		</div>
	</div>
	<div class="max-w-7xl">
		<Highlight
			code={`# general
alias ll='ls -la'
alias zshrc='vim ~/.zshrc'
alias hosts='sudo vim /etc/hosts'

# directories
alias dev='cd ~/Development'
alias projects='cd ~/Development/projects'

# git
alias mylog='git log --author="Michael Bonner" --pretty=format:"%aD : %s"'
alias gs='git status'
alias gb='git branch'
alias gpull='git pull'
alias gpo='git pull origin'
alias gp='git pull'
alias gpush='git push'
alias gf='git fetch'
alias gl="git log --graph --abbrev-commit --decorate --format=format:'%C(bold blue)%h%C(reset) - %C(bold cyan)%aD%C(reset) %C(bold green)(%ar)%C(reset)%C(bold yellow)%d%C(reset)%n''          %C(white)%s%C(reset) %C(dim white)- %an%C(reset)' --all"
alias gl2="git log --graph --abbrev-commit --decorate --date=relative --format=format:'%C(bold blue)%h%C(reset) - %C(bold green)(%ar)%C(reset) %C(white)%s%C(reset) %C(dim white)- %an%C(reset)%C(bold yellow)%d%C(reset)' --all"
alias gcm='git checkout main'
alias gcma='git checkout master'
alias gcd='git checkout development'
alias gcs='git checkout staging'
alias gpma='git pull origin master'
alias gpd='git pull origin development'
alias gps='git pull origin staging'
alias ga='git add .'
alias gc='git commit -m '
alias gac='git commit -am '
alias ggs='find . -type d -name '.git' -maxdepth 3 | while read dir ; do sh -c "cd $dir/../ && echo -e "GIT STATUS IN $&#123;dir//.git/&#123;" && git status -s" ; done'
alias ggpull='find . -type d -name '.git' -maxdepth 3 | while read dir ; do sh -c "cd $dir/../ && echo -e "GIT PULL IN $&#123;dir//.git/&#123;" && git pull" ; done'
alias gc--.='git checkout -- .'
alias gch='git checkout'
alias gclean='git reset --hard;git clean -df;'
alias ghash='git rev-parse HEAD | pbcopy'
alias gt='git trim'
alias ggt='find . -type d -name '.git' -maxdepth 3 | while read dir ; do sh -c "cd $dir/../ && echo -e "GIT TRIM IN $&#123;dir//.git/&#123;" && git trim" ; done'

# laravel
alias sup='sail up'
alias sdo='sail down'
alias pa='sail artisan'
alias mfs='sail artisan queue:clear; sail artisan migrate:fresh --seed'
alias cda='composer dump-autoload'
alias sail='./vendor/bin/sail'
alias sa='sail artisan'
alias sc='sail composer'
alias smfs='sail artisan queue:clear; sail artisan migrate:fresh --seed'

# npm
alias nr='npm run'
alias nrs='npm run start'
alias nrss='npm run start-secure'
alias nrd='npm run dev'
alias nrt='npm run test'
alias nrw='npm run watch'
alias nrp='npm run prod'
alias nrb='npm run build'
alias nrl='npm run lint'
alias nrc='npm run codegen'
alias nrg='npm run generate'
alias npmout='find . -type d -name .git -maxdepth 3 | while read dir ; do sh -c "cd $dir/../ && echo -e "NPM STATUS IN $&#123;dir//.git/&#125;" && npm out" ; done'
alias npmup='find . -type d -name '.git' -maxdepth 2 | while read dir ; do sh -c "cd $dir/ && echo -e "NPM UPDATE IN $&#123;dir//.git/&#125;" && npm up" ; done'
alias y='yarn'
alias mjml='./node_modules/.bin/mjml'
alias nd='netlify dev'
alias npm='~/.npm-global/bin/npm'

# bun
alias br='bun run'
alias brs='bun run start'
alias brss='bun run start-secure'
alias brd='bun run dev'
alias brt='bun run test'
alias brw='bun run watch'
alias brp='bun run prod'
alias brb='bun run build'
alias brl='bun run lint'
alias brc='bun run codegen'
alias brg='bun run generate'

# docker
alias dcu='docker compose up'
alias dcd='docker compose down'

# deployments
alias vl='vercel ls'

# misc
alias c='open . -a "/Applications/Visual Studio Code.app"
alias st='open . -a /Applications/Sourcetree.app'
alias vim='lvim'
`}
			language={bash}
		/>
	</div>

	<div class="prose dark:prose-invert mt-16 max-w-3xl">
		<p>
			Published:&nbsp;
			<time dateTime="2021-07-15">15 Jul 2021</time>
		</p>
		<p>
			Updated:&nbsp;
			<time dateTime="2022-08-10">18 Apr 2024</time>
		</p>
	</div>
</div>
