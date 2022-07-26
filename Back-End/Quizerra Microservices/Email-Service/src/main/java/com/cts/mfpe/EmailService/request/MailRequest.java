package com.cts.mfpe.EmailService.request;

import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;
import org.springframework.web.context.WebApplicationContext;

@Scope(value= WebApplicationContext.SCOPE_REQUEST, proxyMode = ScopedProxyMode.TARGET_CLASS)
@Component
public class MailRequest {
    String email;
    String score;
    String title;

    public String getScore() {
		return score;
	}

	public void setScore(String score) {
		this.score = score;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

    public MailRequest(String email, String score, String title) {
		super();
		this.email = email;
		this.score = score;
		this.title = title;
	}

	public MailRequest() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
